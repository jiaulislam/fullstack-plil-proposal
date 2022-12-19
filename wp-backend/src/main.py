# pyright: reportUnknownMemberType=false

import sqlalchemy as sa
import uvicorn
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from .config import settings, BASE_PATH
from .dependencies import get_session

app = FastAPI(debug=settings.DEVELOPMENT)


@app.get("/")
def root(db: Session = Depends(get_session)):
    return {
        "records": db.execute(sa.text("SELECT * FROM tbl_change_request")).fetchmany(
            100
        )
    }


def run():
    uvicorn.run(
        "src.main:app",
        host="elifeapi.test",
        port=8080,
        reload=settings.DEVELOPMENT,
        ssl_keyfile= BASE_PATH / "elifeapi.test+2-key.pem",
        ssl_certfile= BASE_PATH / "elifeapi.test+2.pem",
    )


if __name__ == "__main__":
    run()
