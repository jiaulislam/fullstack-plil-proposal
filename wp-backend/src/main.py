# pyright: reportUnknownMemberType=false

import sqlalchemy as sa
import uvicorn
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from config import settings
from dependencies import get_session

app = FastAPI(debug=settings.DEVELOPMENT)


@app.get("/")
def root(db: Session = Depends(get_session)):
    return {
        "records": db.execute(sa.text("SELECT * FROM tbl_change_request")).fetchmany(
            100
        )
    }


def run():
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=settings.DEVELOPMENT)


if __name__ == "__main__":
    run()
