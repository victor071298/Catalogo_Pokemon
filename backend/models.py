from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Tipo(Base):
    __tablename__ = "tipos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, unique=True, index=True)

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)  # ID gerado automaticamente
    codigo = Column(Integer, index=True)                # Apenas visual
    nome = Column(String, index=True)

    tipo_primario_id = Column(Integer, ForeignKey("tipos.id"))
    tipo_secundario_id = Column(Integer, ForeignKey("tipos.id"), nullable=True)

    tipo_primario = relationship("Tipo", foreign_keys=[tipo_primario_id])
    tipo_secundario = relationship("Tipo", foreign_keys=[tipo_secundario_id])