from pydantic import BaseModel
from typing import Optional  # Permite campos que podem ser None

# Modelos para o tipo de Pokemon

# Modelo base
class TipoBase(BaseModel):
    nome: str 

# Modelo para criação de Tipo
class TipoCreate(TipoBase):
    pass  # Herda tudo de TipoBase

# Modelo final
class Tipo(TipoBase):
    codigo: int  # O banco gera esse código automaticamente

    class Config:
        orm_mode = True  # Permite converter objetos SQLAlchemy em Pydantic (ex: Tipo.from_orm(objeto))


# Modelos para os pokemons

# Modelo base: define os campos obrigatórios e opcionais
class PokemonBase(BaseModel):
    codigo: int  
    nome: str
    codigo_tipo_primario: int  # FK para o tipo primário
    codigo_tipo_secundario: Optional[int] = None  # FK opcional para o tipo secundário

# Modelo usado ao criar um Pokémon
class PokemonCreate(PokemonBase):
    pass  #todos os dados vêm na criação

# Modelo final retornado pela API
class Pokemon(PokemonBase):
    class Config:
        orm_mode = True  # Permite usar o .from_orm() com objetos do banco
