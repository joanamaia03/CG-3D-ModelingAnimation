# CG 2023/2024

## Group T07G11

## TP 3 Notes

- No exercício 1, declaramos as normais nas figuras das classes MyUnitCube e MyTangram de modo a visualizar o ângulo de incidência da luz. De seguida, criamos um material com cor semelhante a madeira, com baixa componente especular e testamos no cubo.

MyUnitCube
![Screenshot 1](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp3/screenshots/CG-t07g11-tp3-1.png)

Por fim, dentro da classe MyTangram, criamos um material para cada uma das peças da figura com a respetiva cor e com alta componente especular.

MyTangram
![Screenshot 2](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp3/screenshots/CG-t07g11-tp3-2.png)

- No exercício 2, criamos a classe MyPrism que contém as variáveis slices e stacks e deste modo desenhar um prisma com um número variável de lados e andares. Assim, implementamos um algoritmo que cria vértices (definindo alguns mais do que uma vez) e normais para cada vértice. Por fim observamos que a iluminação calculada é semelhante à calculada com "Constant Shading" pois as normais são iguais para a mesma face.

MyPrism
![Screenshot 3](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp3/screenshots/CG-t07g11-tp3-3.png?ref_type=heads)

- No exercício 3, criamos a classe MyCylinder, baseada na classe MyPrism, mas com a normal de cada vértice perpendicular à superfície do cilindro perfeito em que o prisma original está inscrito. Deste modo, simplificamos a lista de vértice e normais e assim eliminamos duplicados. Por fim observamos que as transições de iluminação nas arestas são suavizadas, tornando-as menos evidentes, e dando uma aparência curva à superfície.

MyCylinder
![Screenshot 4](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp3/screenshots/CG-t07g11-tp3-4.png) 
