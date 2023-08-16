
export interface CountriesInterface {

    idpais: number;
    nompais: string;
    codpais: number;
}

export interface DepartmentsInterface {

    iddepto: number;
    codigodepto: number;
    nomdepartamento: string;
    idpais: number;
    valorimportacion: string;

}

export interface MunicipalitiesInterface {

    idmunicipio: number;
    nommunicipio: string;
    iddepto: number;
    codmunicipio: number;

}

