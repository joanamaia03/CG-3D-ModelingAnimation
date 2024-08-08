# CG 2023/2024

## Group T07G11
- Igor Andrade up202108674
- Joana Maia up202108835

## Project Notes

### Sky-Sphere

- Na parte 'Criação de uma Esfera', criamos uma nova classe MySphere com uma esfera centrada na origem. De seguida, adicionamos-lhe uma textura.

- Na parte 'Adição de Panoramas', parameterizamos a classe MySphere de modo a poder inverter as suas faces. De seguida, criamos a classe MyPanorama de modo a criar uma esfera invertida coberta com a textura da parte anterior. Por fim, incluimos um panorama onde o observador se pode desclocar dentro da esfera se pode deslocar.

MyPanorama - FoV 1
![screenshot 1](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-1a.png?ref_type=heads)

MyPanorama - FoV 2
![screenshot 2](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-1b.png)

### Flores

- Na parte 'Modelação de uma flor', criamos 3 novas classes denominadas MyPetal, MyReceptacle, MyStem que constituem as partes de uma flor. De seguida criamos a classe MyFlower onde agrupamos todos esses componentes de modo a criar a flor.

- Na parte 'Parametrização da flor', adicionamos parametros ao contrutor da classe MyFlower que permitiram definir o nº, tamanho e cor de cada componente da flor tornando-a parameterizável. De seguida, através da rotação conseguimos simular uma curvatura nas pétalas também parameterizada. Por fim, em cada cilindro que constitui o caule colocamos uma folha (constituida por dois triangulos e um cilindro). É de notar que tanto o ângulo na junção das pétalas ao receptáculo da flor como o tamanho dos cilindros que constituem o caule como o diâmetro exterior da flor foram aleatorizados e os cilindros apresentam um desalinhamento entre si, criando curvatura no caule.

- Na parte 'Aleatoriedade e diversidade na flor' atribuimos aleatoriedade a todos os componentes que foram parameterizados fazendo com que sempre que uma flor é instanciada, ela adota uma morfologia difernte. Por fim, criamos a classe MyGarden que cria um conjunto de flores formando uma matriz de 5x5.

- Na parte 'Texturas nas flores' adicionamos uma textura a todas as partes da flor de modo a torna-la mais realista.

MyGarden
![screenshot 3](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-2.png)


### Pedras e penedos

- Na parte 'Pedras e penedos' criamos uma nova classe MyRock onde criamos uma esfera e mudamos os vértices de modo a transmitir a sensação de deformação de uma pedra. Por fim, criamos a classe MyRockSet que gere um conjunto de pedras aleatórias, assim como uma piâmide constituída por pedras amontoadas. As orientações e dimensões das pedras são geradas aleatóriamente cada vez que uma pedra é instanciada exceto para a pirâmide de pedras onde elas são todas iguais. Também colocamos uma textura às pedras de modo a torna-las mais realistas.

MyRock
![screenshot 4](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-3a.png?ref_type=heads)

MyRockSet
![screenshot 5](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-3b.png)

### Abelha

- Na parte 'Modelação da abelha' criamos uma nova classe MyBee onde chamamos várias classes utilizadas nos trabalhos anteriores de modo a modelar a abelha. Optamos por utilizar o modelo "filme de animação" criando um par de asas, dois pares de patas, uma cabeça e um abdómen. Nas asas colocamos transparência de modo a torna-las mais realistas. Por fim, colocamos textura em todas as partes da abelha.

MyBee
![screenshot 6](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-4.png)

- Na parte 'Animação da abelha' criamos duas animações. Uma que faz a abelha oscilar de cima para baixo e outra para bater as asas de forma a simular a sensação de voo.

- Na parte 'Controlo da abelha' alteramos a classe MyInterface adicionando métodos que permitem processar mais do que uma tecla em simultâneo e de seguida, na classe MyScene, criamos uma função de teste que permite verificar se as teclas estão a ser precionadas ao mesmo tempo. Por fim, na classe MyBee definimos as posições da abelha assim como a sua orientação e velocidade. Nesta classe também criamos dois métodos, turn(v) e accelerate(v), que permitirão que a abelha voe pelo panorama de acordo com o clique nas respetivas teclas. Para além destas funcionalidades, criamos dois sliders que permitem mudar o speed da abelha e a sua dimensão (speedFactor e scaleFactor ).

MyBee
![screenshot 7](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-5a.png)
![screenshot 8](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-5b.gif)

### Pólen e colmeia

- Na parte 'Pólen e colmeia' criamos duas novas classes MyPollen e MyHive. Na classe MyPollen reutilizamos o código da classe MySphere e dividimos a esfera em dois hemisférios. De seguida atribuimos diferentes valores de y a cada um dos hemisférios de modo a dar o aspeto oval ao pólen. Na classe MyHive chamamos duas funções auxiliares, MyHiveBoddy e MyHiveTop, que criam dois cilindros e através de tranformações contruimos a cólmeia cortiço. No final, colocamos textura tanto no polén como na cólmeia de modo a torna estes elementos mais realistas e adicionamos funcionalidades que permitem a abelha apanhar e largar o pólen.

MyPollen
![screenshot 9](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-6a.png)
![screenshot 10](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-6b.png?ref_type=heads)

MyHive
![screenshot 11](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-6c.png?ref_type=heads)

### Shaders e animação

- Na parte 'Shaders e animação' criamos uma matrix composta por elementos de uma nova classe que criamos chamada MyGrass dentro de outra classe nova chamada MyGrassSet. A classe MyGrass faz uso de triangulos e retangulos para construir uma folha de relva. Após colocarmos as folhas de relva em cena criamos um shader para que estas ondulassem, para parecer que existe vento.

MyGrass

![screenshot 12](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-7b.png?ref_type=heads)

MyGrassSet
![screenshot 13](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-7a.png)

### Desenvolvimentos adicionais

- Na parte 'Desenvolvimentos adicionais' escolhemos a opção B. Para isso criamos então um novo shader que usa uma textura de nuvem com o canal alpha para que a mesma seja um pouco transparente e sobreponha a textura existente do panorama. Aplicamos uma rotação à nova textura para que esta dé a ideia que as nuvens estão a andar, aumentando o realismo da cena.

MyPanorama
![screenshot 13](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/project/screenshots/project-t07g11-8.png?ref_type=heads)
