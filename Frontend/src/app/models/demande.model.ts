import { Deserializable } from "./deserializable.model";
import { User } from "./user.model";


export class Demande implements Deserializable {
    
    id: number;
    objet: string;
    description: string;
    validation_hierarchique: boolean;
    validation_securite: boolean;
    validation_admin: boolean;
    date: Date;
    date_expiration: Date;
    status_demande: string;
    beneficiaire: User;
    demandeur: User;
    validateur_hierarchique: User;
    validateur_securite: User;
    protocoles: string[];
    applications: string[];
    
    
    deserialize(input: any): this {
        Object.assign(this, input);

        this.demandeur = new User().deserialize(input.demandeur);
        this.beneficiaire = new User().deserialize(input.demandeur);
        this.validateur_hierarchique = new User().deserialize(input.validateur_hierarchique);
        this.validateur_securite = new User().deserialize(input.validateur_securite);
        
        return this;
    }
}   
