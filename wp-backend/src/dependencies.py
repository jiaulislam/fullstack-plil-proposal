from typing import Generator

from .database import ScopedSession


def get_session() -> Generator:
    session = ScopedSession()
    try:
        yield session
    except Exception as e:
        raise e
    finally:
        session.close()
