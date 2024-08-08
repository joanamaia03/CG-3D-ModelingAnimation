# CG 2023/2024

## Group T07G11

## TP 5 Notes

- No exercício 1, criamos novos vertex e fragment shaders de forma a colorir o bule de amarelo na parte superior e azul na parte inferior. Para isso, criamos uma variável varying que guarda a posição do vértice no vertex shader e passa-a para o fragment shader.

Yellow and Blue Teapot
![Screenshot1](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp5/screenshots/cg-t07g11-tp5-1.png)

- De seguida, criamos um efeito de translação no eixo XX seguindo uma onda sinusoidal adicionando um novo offset ao aVertexPosition no vertex shader. Por fim, criamos um novo fragment shader baseado no sépia que convertia a cor para tons de cinzento.

Gray Teapot
![Screenshot2](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp5/screenshots/cg-t07g11-tp5-2.png)

- No exercicio 2, criamos novos shaders com a textura de água. Por fim, animamos o plano através desses shaders variando a associação das coordenadas de textura aos vértices e fragmentos ao longo do tempo.

Water Plane
![Screenshot3](https://git.fe.up.pt/cg/cg-2023-2024/t07/cg-t07-g11/-/raw/master/tp5/screenshots/cg-t07g11-tp5-3.png)
