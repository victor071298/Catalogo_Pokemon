import json
from database import SessionLocal, engine
from models import Base, Pokemon, Tipo

# Garante que o banco tá criado
Base.metadata.create_all(bind=engine)

# Lê o JSON com os 150 pokémons
with open("dados_iniciais.json", "r", encoding="utf-8") as f:
    pokemons_data = json.load(f)

db = SessionLocal()

# 1️⃣ Coleta todos os tipos únicos com códigos únicos (gerados incrementalmente)
tipos_unicos = {}
codigo_tipo = 1
for p in pokemons_data:
    for tipo in [p["tipo_primario"], p["tipo_secundario"]]:
        if tipo and tipo not in tipos_unicos:
            tipos_unicos[tipo] = codigo_tipo
            codigo_tipo += 1

# 2️⃣ Cadastra os tipos no banco (com `codigo` explícito)
for nome, codigo in tipos_unicos.items():
    tipo_existente = db.query(Tipo).filter(Tipo.codigo == codigo).first()
    if not tipo_existente:
        novo_tipo = Tipo(codigo=codigo, nome=nome)
        db.add(novo_tipo)

db.commit()

# 3️⃣ Cria o mapa nome -> código
tipos_map = {tipo.nome: tipo.codigo for tipo in db.query(Tipo).all()}

# 4️⃣ Cadastra os pokémons
for p in pokemons_data:
    tipo1_codigo = tipos_map[p["tipo_primario"]]
    tipo2_codigo = tipos_map[p["tipo_secundario"]] if p["tipo_secundario"] else None

    db_pokemon = db.query(Pokemon).filter(Pokemon.codigo == p["codigo"]).first()
    if not db_pokemon:
        novo_pokemon = Pokemon(
            codigo=p["codigo"],
            nome=p["nome"],
            codigo_tipo_primario=tipo1_codigo,
            codigo_tipo_secundario=tipo2_codigo
        )
        db.add(novo_pokemon)

db.commit()
db.close()

print("✅ Tipos e Pokémons importados com sucesso!")
