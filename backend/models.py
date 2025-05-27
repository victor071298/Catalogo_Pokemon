from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Tipo(Base):
    __tablename__ = "tipos"
    codigo = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True)

class Pokemon(Base):
    __tablename__ = "pokemons"

    codigo = Column(Integer, primary_key=True, index=True)  # Agora é a chave primária real
    nome = Column(String, index=True)

    codigo_tipo_primario = Column(Integer, ForeignKey("tipos.codigo"))
    codigo_tipo_secundario = Column(Integer, ForeignKey("tipos.codigo"), nullable=True)

    tipo_primario = relationship("Tipo", foreign_keys=[codigo_tipo_primario])
    tipo_secundario = relationship("Tipo", foreign_keys=[codigo_tipo_secundario])
