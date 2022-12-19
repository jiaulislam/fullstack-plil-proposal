# pyright: reportUnknownVariableType=false

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, scoped_session, sessionmaker

from .config import settings

Base = declarative_base()
engine = create_engine(
    url=settings.get_db_uri(), future=True, echo=settings.DEVELOPMENT
)

session_factory = sessionmaker(bind=engine, autocommit=False, autoflush=False)

ScopedSession = scoped_session(session_factory=session_factory)
Base.query = ScopedSession.query_property()
