from sqlalchemy.orm import Session
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
import models, schemas


# Funções CRUD para os tipos de pokemon

# Retorna todos os tipos cadastrados no banco
def get_tipos(db: Session):
    return db.query(models.Tipo).all()

# Cria um novo tipo no banco
def create_tipo(db: Session, tipo: schemas.TipoCreate):
    db_tipo = models.Tipo(nome=tipo.nome)
    db.add(db_tipo)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Já existe um Tipo com esse nome.")
    db.refresh(db_tipo)
    return db_tipo

# Atualiz um tipo ja existente
def update_tipo(db: Session, codigo: int, tipo_data: schemas.TipoCreate):
    tipo = db.query(models.Tipo).filter(models.Tipo.codigo == codigo).first()
    if not tipo:
        return None

    tipo.nome = tipo_data.nome
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Já existe um Tipo com esse nome.")
    db.refresh(tipo)
    return tipo

# Deleta um tipo, se não houver pokémons vinculados a ele
def delete_tipo(db: Session, codigo: int):
    tipo = db.query(models.Tipo).filter(models.Tipo.codigo == codigo).first()
    if not tipo:
        return None

    # Verifica se há pokémons que usam esse tipo como primário ou secundário
    pokemons_usando_tipo = db.query(models.Pokemon).filter(
        (models.Pokemon.codigo_tipo_primario == codigo) |
        (models.Pokemon.codigo_tipo_secundario == codigo)
    ).first()

    if pokemons_usando_tipo:
        raise HTTPException(
            status_code=400,
            detail="Não é possível excluir esse tipo pois existem pokémons que o usam."
        )

    db.delete(tipo)
    db.commit()
    return True


# Funções CRUD para os pokemons

# Retorna todos os pokémons cadastrados
def get_pokemons(db: Session):
    return db.query(models.Pokemon).all()

# Cria um novo pokémon no banco
def create_pokemon(db: Session, pokemon: schemas.PokemonCreate):
    db_pokemon = models.Pokemon(
        codigo=pokemon.codigo,
        nome=pokemon.nome,
        codigo_tipo_primario=pokemon.codigo_tipo_primario,
        codigo_tipo_secundario=pokemon.codigo_tipo_secundario
    )
    db.add(db_pokemon)
    try:
        db.commit()
    except IntegrityError as e:
        db.rollback()
        msg = str(e.orig).lower()  # Pega a mensagem do erro em minúsculas
        if "codigo" in msg:
            raise HTTPException(status_code=400, detail="Já existe um Pokémon com esse código.")
        elif "nome" in msg:
            raise HTTPException(status_code=400, detail="Já existe um Pokémon com esse nome.")
        else:
            raise HTTPException(status_code=400, detail="Erro ao criar Pokémon: dados duplicados.")
    db.refresh(db_pokemon)
    return db_pokemon

# Atualiza um pokemon
def update_pokemon(db: Session, codigo: int, dados: schemas.PokemonCreate):
    existente = db.query(models.Pokemon).filter(models.Pokemon.codigo == codigo).first()
    if not existente:
        return None

    # Verifica se outro pokémon já tem esse nome
    outro = db.query(models.Pokemon).filter(models.Pokemon.nome == dados.nome).first()
    if outro and outro.codigo != codigo:
        raise HTTPException(status_code=400, detail="Já existe um Pokémon com esse nome.")

    # Atualiza os dados
    existente.nome = dados.nome
    existente.codigo_tipo_primario = dados.codigo_tipo_primario
    existente.codigo_tipo_secundario = dados.codigo_tipo_secundario
    db.commit()
    db.refresh(existente)
    return existente


# Deleta um pokémon pelo código
def delete_pokemon(db: Session, codigo: int):
    pokemon = db.query(models.Pokemon).filter(models.Pokemon.codigo == codigo).first()
    if not pokemon:
        return None # Pokemon não encontrado

    db.delete(pokemon)
    db.commit()
    return True