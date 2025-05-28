from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
import models, crud, schemas

# Inicializa o app FastAPI
app = FastAPI()

# Configuração de CORS para permitir acesso do frontend (localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados, se ainda não existirem
models.Base.metadata.create_all(bind=engine)

# Dependência para obter uma sessão de banco de dados em cada request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Rota raiz só para testar se a API está funcionando
@app.get("/")
def read_root():
    return {"msg": "API do Pokémon Catalog está no ar!"}

# -------------------------
# ROTAS DE TIPOS DE POKÉMON
# -------------------------

@app.get("/tipos", response_model=list[schemas.Tipo])
def listar_tipos(db: Session = Depends(get_db)):
    return crud.get_tipos(db)

@app.post("/tipos", response_model=schemas.Tipo)
def criar_tipo(tipo: schemas.TipoCreate, db: Session = Depends(get_db)):
    # Normaliza o nome antes de criar (evita "fogo", "Fogo", "FOGO" etc.)
    tipo.nome = tipo.nome.strip().title()
    return crud.create_tipo(db, tipo)

@app.put("/tipos/{codigo}", response_model=schemas.Tipo)
def atualizar_tipo(codigo: int, dados: schemas.TipoCreate, db: Session = Depends(get_db)):
    # Também normaliza ao atualizar
    dados.nome = dados.nome.strip().title()
    tipo_atualizado = crud.update_tipo(db, codigo, dados)
    if not tipo_atualizado:
        raise HTTPException(status_code=404, detail="Tipo não encontrado")
    return tipo_atualizado

@app.delete("/tipos/{codigo}")
def deletar_tipo(codigo: int, db: Session = Depends(get_db)):
    sucesso = crud.delete_tipo(db, codigo)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Tipo não encontrado")
    return {"ok": True}

# -------------------------
# ROTAS DE POKÉMONS
# -------------------------

@app.get("/pokemons", response_model=list[schemas.Pokemon])
def listar_pokemons(
    nome: str = Query(default=None),
    tipo: str = Query(default=None),
    db: Session = Depends(get_db)
):
    # Busca pokémons com filtros opcionais por nome e tipo
    pokemons = db.query(models.Pokemon)

    if nome:
        # Filtro por nome (insensitive)
        pokemons = pokemons.filter(models.Pokemon.nome.ilike(f"%{nome}%"))

    if tipo:
        # Filtro por tipo (primário ou secundário)
        tipo_encontrado = db.query(models.Tipo).filter(models.Tipo.nome == tipo).first()
        if tipo_encontrado:
            pokemons = pokemons.filter(
                (models.Pokemon.codigo_tipo_primario == tipo_encontrado.codigo) |
                (models.Pokemon.codigo_tipo_secundario == tipo_encontrado.codigo)
            )

    return pokemons.all()

@app.post("/pokemons", response_model=schemas.Pokemon)
def criar_pokemon(pokemon: schemas.PokemonCreate, db: Session = Depends(get_db)):
    # Normaliza o nome antes de salvar
    pokemon.nome = pokemon.nome.strip().title()
    return crud.create_pokemon(db, pokemon)

@app.put("/pokemons/{codigo_antigo}", response_model=schemas.Pokemon)
def atualizar_pokemon(codigo_antigo: int, dados: schemas.PokemonCreate, db: Session = Depends(get_db)):
    # Também normaliza na atualização
    dados.nome = dados.nome.strip().title()
    poke_atualizado = crud.update_pokemon(db, codigo_antigo, dados)
    if not poke_atualizado:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return poke_atualizado

@app.delete("/pokemons/{codigo}")
def deletar_pokemon(codigo: int, db: Session = Depends(get_db)):
    sucesso = crud.delete_pokemon(db, codigo)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Pokémon não encontrado")
    return {"ok": True}
