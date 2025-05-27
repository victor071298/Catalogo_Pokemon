from pydantic import BaseModel
from typing import Optional

# Tipos
class TipoBase(BaseModel):
    nome: str

class TipoCreate(TipoBase):
    pass

class Tipo(TipoBase):
    id: int

    class Config:
        orm_mode = True

# Pokémons
class PokemonBase(BaseModel):
    codigo: int
    nome: str
    tipo_primario_id: int
    tipo_secundario_id: Optional[int] = None

class PokemonCreate(PokemonBase):
    pass

class Pokemon(PokemonBase):
    id: int

    class Config:
        orm_mode = True