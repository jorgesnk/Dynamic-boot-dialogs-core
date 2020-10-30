import { IConnectionModules } from '../../interfaces/modules/iConnectionModules';
import { connect } from 'mongoose'
import { Constants } from '../../config/constants';
export class MongoConnectionModule implements IConnectionModules {
    public async connection() {
        return new Promise<boolean>((resolve, reject) => {
            connect(Constants.mongoQueryConnection, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true)
            });
        })
    }
}