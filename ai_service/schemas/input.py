from pydantic import BaseModel

class MatchInput(BaseModel):
    teamA: str
    teamB: str
    teamA_rating: float
    teamB_rating: float
