from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

questions_db = [
    {
        "id": 1,
        "question": "React là thư viện của ngôn ngữ nào?",
        "options": ["Python", "JavaScript", "Java", "C#"],
        "correct_answer": "JavaScript"
    },
    {
        "id": 2,
        "question": "FastAPI được xây dựng bằng ngôn ngữ gì?",
        "options": ["Python", "JavaScript", "Ruby", "Go"],
        "correct_answer": "Python"
    },
    {
        "id": 3,
        "question": "HTML viết tắt của từ gì?",
        "options": ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        "correct_answer": "Hyper Text Markup Language"
    },
    {
        "id": 4,
        "question": "CSS dùng để làm gì?",
        "options": ["Lập trình logic", "Quản lý cơ sở dữ liệu", "Định dạng trang web", "Tạo API"],
        "correct_answer": "Định dạng trang web"
    },
    {
        "id": 5,
        "question": "Git là gì?",
        "options": ["Ngôn ngữ lập trình", "Trình duyệt web", "Hệ quản trị cơ sở dữ liệu", "Hệ thống quản lý phiên bản"],
        "correct_answer": "Hệ thống quản lý phiên bản"
    }
]

class Answer(BaseModel):
    question_id: int
    selected_answer: str

class SubmitRequest(BaseModel):
    answers: List[Answer]

@app.get("/questions")
def get_questions():
    # Return questions without the correct answers
    return [
        {
            "id": q["id"],
            "question": q["question"],
            "options": q["options"]
        }
        for q in questions_db
    ]

@app.post("/submit")
def submit_answers(request: SubmitRequest):
    score = 0
    total = len(questions_db)
    results = []

    for answer in request.answers:
        q = next((q for q in questions_db if q["id"] == answer.question_id), None)
        if q:
            is_correct = q["correct_answer"] == answer.selected_answer
            if is_correct:
                score += 1
            results.append({
                "question_id": q["id"],
                "question": q["question"],
                "selected_answer": answer.selected_answer,
                "correct_answer": q["correct_answer"],
                "is_correct": is_correct
            })

    return {
        "score": score,
        "total": total,
        "results": results
    }
