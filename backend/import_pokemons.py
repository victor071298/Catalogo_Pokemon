import json
from database import SessionLocal, engine
from models import Base, Pokemon, Tipo

# Garante que o banco tá criado
Base.metadata.create_all(bind=engine)

# Lê o JSON com os 150 pokémons
with open("dados_iniciais.json", "r") as f:
    pokemons_data = json.load(f)

db = SessionLocal()

# 1️⃣ Coleta todos os tipos únicos
tipos_unicos = set()
for p in pokemons_data:
    tipos_unicos.add(p["tipo_primario"])
    if p["tipo_secundario"]:
        tipos_unicos.add(p["tipo_secundario"])

# 2️⃣ Cadastra os tipos no banco (se ainda não existirem)
for nome_tipo in tipos_unicos:
    tipo_existente = db.query(Tipo).filter(Tipo.nome == nome_tipo).first()
    if not tipo_existente:
        novo_tipo = Tipo(nome=nome_tipo)
        db.add(novo_tipo)

db.commit()

# 3️⃣ Cria um dicionário com tipo.nome -> tipo.id
tipos_map = {tipo.nome: tipo.id for tipo in db.query(Tipo).all()}

# 4️⃣ Cadastra os pokémons
for p in pokemons_data:
    tipo1_id = tipos_map[p["tipo_primario"]]
    tipo2_id = tipos_map[p["tipo_secundario"]] if p["tipo_secundario"] else None

    db_pokemon = db.query(Pokemon).filter(Pokemon.codigo == p["codigo"]).first()
    if not db_pokemon:
        novo_pokemon = Pokemon(
            codigo=p["codigo"],
            nome=p["nome"],
            tipo_primario_id=tipo1_id,
            tipo_secundario_id=tipo2_id
        )
        db.add(novo_pokemon)

db.commit()
db.close()

print("Tipos e Pokémons importados com sucesso!")