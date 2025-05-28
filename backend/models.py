from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base  # Classe base do SQLAlchemy

# Modelo da tabela 'tipos' no banco
class Tipo(Base):
    __tablename__ = "tipos"  # Define o nome da tabela como 'tipos'

    codigo = Column(Integer, primary_key=True, index=True)  # Chave primária de tipos
    nome = Column(String, unique=True, index=True)          # Nome do tipo, único e buscável

# Modelo da tabela 'pokemons' no banco
class Pokemon(Base):
    __tablename__ = "pokemons" 

    codigo = Column(Integer, primary_key=True, index=True)  # Chave primária do Pokémon
    nome = Column(String, unique=True, index=True)                      # Nome do Pokémon, com índice para facilitar busca

    # Chaves estrangeiras que ligam esse Pokémon aos seus tipos 
    codigo_tipo_primario = Column(Integer, ForeignKey("tipos.codigo"))           # Tipo primário obrigatório
    codigo_tipo_secundario = Column(Integer, ForeignKey("tipos.codigo"), nullable=True)  # Tipo secundário opcional

    # Relacionamentos que permitem acessar os objetos Tipo diretamente
    tipo_primario = relationship("Tipo", foreign_keys=[codigo_tipo_primario])   
    tipo_secundario = relationship("Tipo", foreign_keys=[codigo_tipo_secundario]) 