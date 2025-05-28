import json
from database import SessionLocal, engine
from models import Base, Pokemon, Tipo

# Garante que o banco tá criado
Base.metadata.create_all(bind=engine)

# Lendo o JSON com os 150 pokémons
with open("dados_iniciais.json", "r", encoding="utf-8") as f:
    pokemons_data = json.load(f)

db = SessionLocal()

# Coletando todos os tipos únicos com códigos únicos (normalizados com .title())
tipos_unicos = {}
codigo_tipo = 1
for p in pokemons_data:
    for tipo in [p["tipo_primario"], p["tipo_secundario"]]:
        if tipo:
            tipo_formatado = tipo.strip().title()
            if tipo_formatado not in tipos_unicos:
                tipos_unicos[tipo_formatado] = codigo_tipo
                codigo_tipo += 1

# Cadastrando os tipos no banco
for nome, codigo in tipos_unicos.items():
    tipo_existente = db.query(Tipo).filter(Tipo.codigo == codigo).first()
    if not tipo_existente:
        novo_tipo = Tipo(codigo=codigo, nome=nome)
        db.add(novo_tipo)

db.commit()

# Criando o mapa nome -> código com nomes formatados
tipos_map = {tipo.nome: tipo.codigo for tipo in db.query(Tipo).all()}

# Cadastrando os pokémons
for p in pokemons_data:
    tipo1_nome = p["tipo_primario"].strip().title()
    tipo2_nome = p["tipo_secundario"].strip().title() if p["tipo_secundario"] else None

    tipo1_codigo = tipos_map[tipo1_nome]
    tipo2_codigo = tipos_map[tipo2_nome] if tipo2_nome else None

    db_pokemon = db.query(Pokemon).filter(Pokemon.codigo == p["codigo"]).first()
    if not db_pokemon:
        novo_pokemon = Pokemon(
            codigo=p["codigo"],
            nome=p["nome"].strip().title(),
            codigo_tipo_primario=tipo1_codigo,
            codigo_tipo_secundario=tipo2_codigo
        )
        db.add(novo_pokemon)

db.commit()
db.close()

print("Tipos e Pokémons importados com sucesso!")
