from database import db

class Patrimonio(db.Model):
    __tablename__ = 'patrimonios'

    id = db.Column(db.Integer, primary_key=True)
    codigo_patrimonio = db.Column(db.String(50), unique=True, nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    agencia_id = db.Column(db.Integer, nullable=False)
    categoria_id = db.Column(db.Integer, nullable=False)
    valor = db.Column(db.Numeric(10, 2))
    status = db.Column(db.String(30))
