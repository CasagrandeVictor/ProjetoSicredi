from flask import Blueprint, jsonify, request
from models import Patrimonio
from database import db

patrimonios_bp = Blueprint("patrimonios", __name__)

@patrimonios_bp.route("/", methods=["GET"])
def listar_patrimonios():
    patrimonios = Patrimonio.query.all()
    resultado = [
        {
            "id": p.id,
            "codigo_patrimonio": p.codigo_patrimonio,
            "descricao": p.descricao,
            "categoria_id": p.categoria_id,
            "agencia_id": p.agencia_id,
            "valor": float(p.valor),
            "status": p.status
        }
        for p in patrimonios
    ]
    return jsonify(resultado)

@patrimonios_bp.route("/", methods=["POST"])
def adicionar_patrimonio():
    dados = request.json
    novo = Patrimonio(
        codigo_patrimonio=dados["codigo_patrimonio"],
        descricao=dados["descricao"],
        categoria_id=dados["categoria_id"],
        agencia_id=dados["agencia_id"],
        valor=dados.get("valor", 0),
        status=dados.get("status", "Em uso")
    )
    db.session.add(novo)
    db.session.commit()
    return jsonify({"mensagem": "Patrimônio adicionado com sucesso!"})
