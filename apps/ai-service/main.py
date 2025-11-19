from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "online", "service": "ai-service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
