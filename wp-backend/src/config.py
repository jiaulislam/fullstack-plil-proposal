from pathlib import Path
from typing import Union

from pydantic import AnyUrl, BaseSettings, Field, IPvAnyAddress, PositiveInt, StrictStr
from sqlalchemy.engine import URL

BASE_PATH = Path.cwd()


class Settings(BaseSettings):
    DEVELOPMENT: bool = True
    db_username: StrictStr = Field(..., description="User Name of the Database")
    db_password: StrictStr = Field(..., description="Password of the Database")
    db_driver: StrictStr = Field(..., description="The Database driver Type")
    db_api: StrictStr = Field(..., description="The DBAPI module name")
    db_host: Union[IPvAnyAddress, AnyUrl, str] = Field(
        ..., description="The Database instance location"
    )
    db_port: PositiveInt = Field(description="Database running port")
    db_name: StrictStr = Field(..., description="Database Instance Name")

    def get_db_uri(self) -> URL:
        return URL.create(
            drivername=f"{self.db_driver}+{self.db_api}",
            username=self.db_username,
            password=self.db_password,
            host=str(self.db_host),
            port=self.db_port,
            query={"service_name": self.db_name},
        )

    class Config(BaseSettings.Config):
        env_file = "development.env"
        allow_mutation: bool = False


settings = Settings()
