import { Deserializable } from "./deserializable.model";
import { User } from './user.model';

export class Profil implements Deserializable {
    
    entreprise: string;
    telephone: number;
    departement: string;
    superieur: User;

    deserialize(input: any): this {
        console.log('this before = ' + this);
        Object.assign(this, input);
        console.log('this after = ' + this);
        return this;
    }

}
