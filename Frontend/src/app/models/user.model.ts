import { Deserializable } from './deserializable.model';
import { Profil } from './profil.model';

export class User implements Deserializable {
    
    public id: number;
    public username: string;
    public email: string;
    public profil: Profil;

    deserialize(input: any): this {

        console.log(this);
        console.log(input);
        console.log("--------------------");
        Object.assign(this, input);
        console.log(this);
        this.profil = new Profil().deserialize(input.profil)

        return this;
    }
}