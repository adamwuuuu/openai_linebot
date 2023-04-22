#coding:UTF-8
import json
import random
from datetime import timedelta
import os
from flask import Blueprint, views, render_template, request, jsonify, redirect, url_for, session
# from flask_mail import Message
# from flask_login import current_user,login_user,logout_user
# from werkzeug.security import generate_password_hash, check_password_hash
# from pojo import *
# from mail import send_mail
# from redis_cache import redis_cache

# from flask_jwt_extended import (
#     JWTManager, jwt_required, create_access_token,
#     create_refresh_token,
#     get_jwt_identity
# )

# import stripe

api_dp = Blueprint("api", __name__, url_prefix='/api')


# stripe.api_key =os.environ.get('STRIPE_SECRET_KEY')

@api_dp.route("/",methods=['POST'])
def test_page():
    data = request.get_json(force=True)
    username = data["user_name"]
    password = data["user_password"]
    email = data["user_email"]
    uid = data["user_id"]

    print("UName: ",username)
    print("UID: ",uid)

    return jsonify({"success":True,"msg":"Testing","access_token":""})

# @api_dp.route("/refresh_token",methods=['POST'])
# @jwt_required(refresh=True)
# def refresh_expiring_jwts():
#     # try:
#         print(get_jwt_identity())
#         access_token = create_access_token(identity=get_jwt_identity())
#         print(access_token)
#         return jsonify({"success":True,"msg":"Refresh OK","access_token":access_token})
#     # except (RuntimeError, KeyError):
#     #     # Case where there is not a valid JWT. Just return the original response
#     #     return jsonify({"success":False,"msg":"Refresh Failed","access_token":""})
#
# @api_dp.route("/getstripe_key")
# def getstripe_key():
#     return jsonify({'publicKey':os.environ.get('STRIPE_PUBLIC_KEY')})
#
# @api_dp.route('/create-checkout-session',methods=['POST'])
# @jwt_required()
# def create_checkout_session():
#     domain_url="https://vue-flaskk.herokuapp.com/"
#     try:
#
#         # product=stripe.Product.create(name="product test")
#         #
#         # price=stripe.Price.create(
#         #       currency="usd",
#         #     unit_amount=100,
#         #     recurring={"interval": "month"},
#         #     product=product.id,
#         # )
#
#         # For full details see https:#stripe.com/docs/api/checkout/sessions/create
#         # ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
#         checkout_session =  stripe.checkout.Session.create(
#             success_url=domain_url+"?session_id={CHECKOUT_SESSION_ID}",
#             cancel_url=domain_url,
#             mode='payment',
#             line_items=[{
#                 'price':"price_1Lh2qPDTVIYHY3Ehc20B2s9b",
#                 'quantity': 1,
#             }],
#             payment_method_types=['card'],
#         )
#
#         return jsonify({"success":True,'sessionId': checkout_session['id'],"msg":"ok"})
#     except Exception as e:
#         return jsonify({"success": False, 'sessionId': "","msg":e})