from sqlalchemy.orm import Session
import models, schemas

# Tipos

def get_tipos(db: Session):
    return db.query(models.Tipo).all()

def create_tipo(db: Session, tipo: schemas.TipoCreate):
    db_tipo = models.Tipo(nome=tipo.nome)
    db.add(db_tipo)
    db.commit()
    db.refresh(db_tipo)
    return db_tipo

# Pokémons

def get_pokemons(db: Session):
    return db.query(models.Pokemon).all()

def create_pokemon(db: Session, pokemon: schemas.PokemonCreate):
    db_pokemon = models.Pokemon(
        codigo=pokemon.codigo,
        nome=pokemon.nome,
        tipo_primario_id=pokemon.tipo_primario_id,
        tipo_secundario_id=pokemon.tipo_secundario_id
    )
    db.add(db_pokemon)
    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon

def update_pokemon(db: Session, id: int, dados: schemas.PokemonCreate):
    pokemon = db.query(models.Pokemon).filter(models.Pokemon.id == id).first()
    if not pokemon:
        return None

    pokemon.codigo = dados.codigo
    pokemon.nome = dados.nome
    pokemon.tipo_primario_id = dados.tipo_primario_id
    pokemon.tipo_secundario_id = dados.tipo_secundario_id

    db.commit()
    db.refresh(pokemon)
    return pokemon

def delete_pokemon(db: Session, id: int):
    pokemon = db.query(models.Pokemon).filter(models.Pokemon.id == id).first()
    if not pokemon:
        return None

    db.delete(pokemon)
    db.commit()
    return True