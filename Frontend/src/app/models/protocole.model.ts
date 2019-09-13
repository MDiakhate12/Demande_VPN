import { Deserializable } from './deserializable.model';

export class Protocole implements Deserializable {
    id: number;
    nom: string;
    
    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}
