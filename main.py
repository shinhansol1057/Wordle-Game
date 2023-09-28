# from fastapi import FastAPI
# from pydantic import BaseModel
# from fastapi.staticfiles import StaticFiles


# app = FastAPI()

# #서버에서 정답을 보내주는 코드
# answer = 'SUNNY'
# @app.get('/answer')
# def get_answer():
#   return {'answer' : answer}

# app.mount("/", StaticFiles(directory="static", html=True), name="static")