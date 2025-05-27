from sqlalchemy.orm import Session
from fastapi import HTTPException
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

def update_tipo(db: Session, codigo: int, tipo_data: schemas.TipoCreate):
    tipo = db.query(models.Tipo).filter(models.Tipo.codigo == codigo).first()
    if not tipo:
        return None
    tipo.nome = tipo_data.nome
    db.commit()
    db.refresh(tipo)
    return tipo

def delete_tipo(db: Session, codigo: int):
    tipo = db.query(models.Tipo).filter(models.Tipo.codigo == codigo).first()
    if not tipo:
        return None
    db.delete(tipo)
    db.commit()
    return True


# Pokémons

def get_pokemons(db: Session):
    return db.query(models.Pokemon).all()

def create_pokemon(db: Session, pokemon: schemas.PokemonCreate):
    db_pokemon = models.Pokemon(
        codigo=pokemon.codigo,
        nome=pokemon.nome,
        codigo_tipo_primario=pokemon.codigo_tipo_primario,
        codigo_tipo_secundario=pokemon.codigo_tipo_secundario
    )
    db.add(db_pokemon)
    db.commit()
    db.refresh(db_pokemon)
    return db_pokemon

def update_pokemon(db: Session, codigo_antigo: int, dados: schemas.PokemonCreate):
    existente = db.query(models.Pokemon).filter(models.Pokemon.codigo == codigo_antigo).first()
    if not existente:
        return None

    if codigo_antigo != dados.codigo:
        conflito = db.query(models.Pokemon).filter(models.Pokemon.codigo == dados.codigo).first()
        if conflito:
            raise HTTPException(status_code=400, detail="Já existe um Pokémon com esse código.")
        db.delete(existente)
        db.commit()

        novo = models.Pokemon(
            codigo=dados.codigo,
            nome=dados.nome,
            codigo_tipo_primario=dados.codigo_tipo_primario,
            codigo_tipo_secundario=dados.codigo_tipo_secundario
        )
        db.add(novo)
        db.commit()
        db.refresh(novo)
        return novo
    else:
        existente.nome = dados.nome
        existente.codigo_tipo_primario = dados.codigo_tipo_primario
        existente.codigo_tipo_secundario = dados.codigo_tipo_secundario
        db.commit()
        db.refresh(existente)
        return existente

def delete_pokemon(db: Session, codigo: int):
    pokemon = db.query(models.Pokemon).filter(models.Pokemon.codigo == codigo).first()
    if not pokemon:
        return None

    db.delete(pokemon)
    db.commit()
    return True