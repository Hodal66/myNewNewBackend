import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/User";
import { registerValidation, loginValidation } from "../../validation/validation";
import { auth as verify } from "../../validation/validation";
import {admin} from "../../validation/validation"

import {loginUser, deleteUser, getUsers, updateUser, addUser} from "../../controller/auth-controller";

//!!VALIDATION

const router = Router();

/**
 * @openapi
 * tags:
 *  name: User
 *  description: APIs for the user
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: Every user must provide a name
 *        email:
 *          type: string
 *          description: email must be provided
 *        password:
 *          type: string
 *          description: Also provide your password.
 *      example:
 *        name: muheto hodal
 *        email: me@gmail.com
 *        password: hodol123
 */

/**
 * @swagger
 * components:
 *  responses:
 *    UnauthorizedError:
 *      description: Access need Token
 */

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    Token:
 *      type: http
 *      scheme: Bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginInfo:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: an email must be valid
 *              password:
 *                  type: string
 *                  description: password required.
 *          example:
 *            email: mhthodol@gmail.com
 *            password: mine222
 */

/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *    summary: A user can make registration
 *    description: both name, email and password must be provided
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *
 *    responses:
 *      200:
 *        description: Successfully registered.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid input or Bad formated input
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                code:
 *                  type: number
 */

router.post("/register", addUser);
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *    summary: A user must sign-in with his/her credentials
 *    description: A user must provide a valid email and password to login
 *    tags:
 *      - User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginInfo'
 *    responses:
 *      200:
 *        description: Logged-in successfully!, keep your Token
 *      400:
 *        description: Invalid userName or password!
 *      404:
 *        description: Email is not found!
 */
//!!LOGIN
router.post("/login", loginUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *    security:
 *      - Token: []
 *    summary: you can update your profile
 *    description: you need a valid Token to update your profile
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: use a Valid Id
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully updated
 *      500:
 *        description: Internal error!
 */
//UPDATE A USER
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *    security:
 *      - Token: []
 *    summary: This route Allow  to delete an existing User
 *    description: a Token is required to Delete a user
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: you have to provide a valid user Id
 *        schema:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: a user successfully Deleted
 *      204:
 *        description: user not found
 *      401:
 *        description: Access denied!
 */

//!!Delete a user
router.delete("/:id", deleteUser);

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *    security:
 *      - Token: []
 *    summary: This route returns a list of users
 *    responses:
 *      200:
 *        description: Success
 *      204:
 *        description: No user found
 *      401:
 *        description: Access denied
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

//!! Get all users
router.get("/", getUsers);

export { router };
