# QuizTime

Aplicativo mobile de quiz

## Setup

- Ferramentas necessárias:
  - Visual Studio Code
  - XCode (>= 11)
  - Android studio
  - Git
  - Node (> 10)
  - Yarn
  - Prettier (plugin do VSCode recomendado)
  - ESLint (plugin do VSCode recomendado)

Passo-a-passo para setup do ambiente [aqui](./docs/setup-ambiente-react-native.md)

## Como rodar em iOS

Necessário fazer download das dependencias do projeto react-native

```sh
yarn install
```

Necessário também fazer download das dependencias do projeto ios

```sh
npx pod-install
```

Inicializar o build e instalação no emulador

```sh
yarn ios
```

## Como rodar em Androdi

Necessário fazer download das dependencias do projeto react-native

```sh
yarn install
```

Inicializar o build e instalação no emulador

```sh
yarn android
```

## Como rodar os testes

Necessário fazer download das dependencias do projeto react-native

```sh
yarn install
```

```sh
yarn test
```
