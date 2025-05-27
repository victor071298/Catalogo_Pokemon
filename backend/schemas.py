from pydantic import BaseModel
from typing import Optional

# Tipos
class TipoBase(BaseModel):
    nome: str

class TipoCreate(TipoBase):
    pass

class Tipo(TipoBase):
    codigo: int

    class Config:
        orm_mode = True

# Pokémons
class PokemonBase(BaseModel):
    codigo: int
    nome: str
    codigo_tipo_primario: int
    codigo_tipo_secundario: Optional[int] = None

class PokemonCreate(PokemonBase):
    pass

class Pokemon(PokemonBase):
    class Config:
        orm_mode = True
