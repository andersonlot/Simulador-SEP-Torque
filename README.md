# [GearSEP Simulator](https://andersonlot.github.io/Simulador-SEP-Torque)

## Wiki

Você pode [acessar ao WIKI](https://github.com/andersonlot/Simulador-SEP-Torque/wiki) desse projeto para entender como o aplicativo functiona e como utilizar.

## O que é o GearSEP

O GearSEP tem como objetivo ser um Simulador de Transmissão de Torque como representação do Sistema Elétrico de Potência. Utilizando Massas girantes e transmissores com elasticidade regulável, conseguimos criar uma aproximação equivalente dos barramentos de geração, transmissão e carga do sistema elétrico. 

## Como funciona? 

O aplicativo permite inserir massas de três tipos: 

- Gerador : Uma massa que permite alterar o torque instantâneo aplicado, onde irá ser injetado energia no sistema.
- Barramento : Uma massa que pode ou não possuir perdas, porém tem como objetivo apenas transmitir torque para o sistema.
- Carga : Uma massa que permite alterar a energia dissipada como um amortecedor mecânico, onde será drenada a energia do sistema.

Além das massas também existem dois tipos de transmissão:

- Transmissão Real: Nessa é possível alterar a elasticidade da transmissão e também as perdas.
- Transmissão Ideal: Nessa a elasticidade e as perdas são nulas, funcionando apenas como um extensor para barramentos.

## Como está sendo desenvolvido?

O aplicativo está sendo desenvolvido utilizando a biblioteca [Matter.js](https://brm.io/matter-js/) para a simulação física dos componentes e a biblioteca [P5.js](https://p5js.org) para desenvolvimento da interface 3D utilizando a API em JavaScript WebGL.




