from fastapi import FastAPI
from schemas.input import MatchInput
import math
app = FastAPI()

@app.post("/generate-odds")
def generate_odds(data: MatchInput):
    diff = data.teamA_rating - data.teamB_rating

    probA = 1 / (1 + math.exp(-diff / 10))
    probB = 1 - probA

    draw = 0.1
    total = probA + probB + draw

    probA /= total
    probB /= total
    draw /= total

    odds = {
        "teamA": round(1 / probA, 2),
        "teamB": round(1 / probB, 2),
        "draw": round(1 / draw, 2)
    }

    return {
        "teamA_win_prob": round(probA, 3),
        "teamB_win_prob": round(probB, 3),
        "draw_prob": round(draw, 3),
        "odds": odds
    }