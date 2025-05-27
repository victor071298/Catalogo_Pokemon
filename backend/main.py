from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import models, crud, schemas

app = FastAPI()

# Liberação de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # libera o front local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

# Dependência para obter a sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"msg": "API do Pokémon Catalog está no ar!"}

# Tipos
@app.get("/tipos", response_model=list[schemas.Tipo])
def listar_tipos(db: Session = Depends(get_db)):
    return crud.get_tipos(db)

@app.post("/tipos", response_model=schemas.Tipo)
def criar_tipo(tipo: schemas.TipoCreate, db: Session = Depends(get_db)):
    return crud.create_tipo(db, tipo)

# Pokemons
@app.get("/pokemons", response_model=list[schemas.Pokemon])
def listar_pokemons(
    nome: str = Query(default=None),
    tipo: str = Query(default=None),
    db: Session = Depends(get_db)
):
    pokemons = db.query(models.Pokemon)

    if nome:
        pokemons = pokemons.filter(models.Pokemon.nome.ilike(f"%{nome}%"))

    if tipo:
        # Pega os tipos com esse nome
        tipo_encontrado = db.query(models.Tipo).filter(models.Tipo.nome == tipo).first()
        if tipo_encontrado:
            pokemons = pokemons.filter(
                (models.Pokemon.tipo_primario_id == tipo_encontrado.id) |
                (models.Pokemon.tipo_secundario_id == tipo_encontrado.id)
            )

    return pokemons.all()

@app.post("/pokemons", response_model=schemas.Pokemon)
def criar_pokemon(pokemon: schemas.PokemonCreate, db: Session = Depends(get_db)):
    return crud.create_pokemon(db, pokemon)

@app.put("/pokemons/{codigo}", response_model=schemas.Pokemon)
def atualizar_pokemon(codigo: int, dados: schemas.PokemonCreate, db: Session = Depends(get_db)):
    poke_atualizado = crud.update_pokemon(db, codigo, dados)
    if not poke_atualizado:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return poke_atualizado

@app.delete("/pokemons/{codigo}")
def deletar_pokemon(codigo: int, db: Session = Depends(get_db)):
    sucesso = crud.delete_pokemon(db, codigo)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return {"ok": True}
