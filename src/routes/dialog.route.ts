import { Router } from 'express'
import DialogController from '../controllers/dialog.controller'


export class DialogRoute{
    public route = Router();
    private baseRoute:string='/dialog'
    constructor(){
        this.route.post(`${this.baseRoute}`,DialogController.createDialog)
        this.route.get(`${this.baseRoute}`,DialogController.getDialog)
    }
}