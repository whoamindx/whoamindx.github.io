---
layout: post
title: Onkeydown, Onkeypress ou Onkeyup?
---

Bem, em JavaScript já é bem conhecido os famosos 'onkeys' que muitos desenvolvedores não sabem quais as diferenças entre eles e acabam por usar qualquer um que funcione (digo isto pois eu mesmo já fui assim). Então resolvi fazer um post sobre e esclarecer as diferenças entre onkeydown, onkeypress e onkeyup.

Bem, a diferença básica entre eles é que: Em um elemento, o evento `onkeydown` é sempre o primeiro a disparar (quando a tecla é pressionada), o segundo é o `onkeypress` (também quando a tecla é pressionada) e por último é o `onkeyup`(quando solta a tecla e o seu input é adicionada/registrada no DOM).

Você deve tá se perguntando agora qual a diferença entre o `onkeydown` e o `onkeypress`. Bem, o primeiro não faz diferenciação entre letras maiúsculas e minúsculas (para esse, tanto um 'M' como o 'm' irá gerar 77 da tabela ASCII, que seria o 'M', ou seja, para este evento todos o caracteres são considerados maiúsculas).
Já o `onkeypress` faz essa diferenciação, e não é disparado com teclas que não geram caracters (como ALT, CTRL e Backspace, F1-F9), já o `onkeydown` dispara caso seja pressionado o CTRL por exemplo.

Ambos pode-se evitar e manipular o valor a ser inserido no input, já o `onkeyup` não, pois ele só é disparado quando o botão é largado e o valor for inserido no input, ou seja, não se pode cancelar o caractere a ser inserido no input com esse evento.

Abaixo segue um exemplo bem prático, cada textarea irá receber dentro o nome do evento, note que cada uma tem suas particularidade, `keydown` aceitando teclas qua não geram caracteres (F2 por exemplo), `keypress` fazendo a diferenciação entre maiúscular e minúsculas e o `keyup` já se é bem notável que o caractere é inserido primeiro e depois o evento é disparado.

keydown
<textarea onkeydown="this.value += '\n onkeydonw '" cols="20" rows="10"></textarea>

keypress
<textarea onkeypress="this.value += '\n onkeypress '" cols="20" rows="10"></textarea>

keyup (note é possível segurar a tecla, e em seguido o evento é disparado)
<textarea onkeyup="this.value += ' onkeyup \n'" cols="20" rows="10"></textarea>

Obrigado por ler até o fim, se possível, por favor deixe seu comentário sobre o que você achou, caso tenha alguma crítica deixe nos comentários também que tentarei responder todos 😁
