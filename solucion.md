Error # 1: Arrow function planteada con estructura incompleta 
- Ubicación: 30
- Tipo de error: Sintaxis 
- Explicación detallada del error: El primer error consistió en que a la función createSERVER le hace falta un signo de paréntesis de cierre al terminar de definirla.
- Explicación detallada de la corrección: Se implementó el signo de paréntesis de cierre en la línea 30


Error # 2:  Arrow function planteada con estructura incompleta 
- Ubicación: 34
- Tipo de error: Sintaxis
- Explicación detallada del error: El segundo error identificado fue igual primero, faltaba un signo de paréntesis de cierre al final de una arrow function.
- Explicación detallada de la corrección:Se implementó el signo de paréntesis de cierre en la línea 34.


Error # 3: Definición de tipo de contenido con estructura incorrecta 
- Ubicación: 15
- Tipo de error: Lógico 
- Explicación detallada del error: La definición de Content-Type está mal escrita, se usa un guión para separar application y json en lugar de un slash 
- Explicación detallada de la corrección: Se cambió el guión que separa a application y json por una slash


Error # 4: Acceso incorrecto a contenido 
- Ubicación: 22
- Tipo de error: Lógico 
- Explicación detallada del error:  fs.readFile devuelve una promesa en lugar del contenido del archivo filePath 
- Explicación detallada de la corrección: Se implementó fs.readFile como una operación asincrónica utilizando await


Error # 5:Conversión de datos innecesaria
- Ubicación: 24
- Tipo de error: Lógico 
- Explicación detallada del error: esta línea de código convierte en una cadena de strings el contenido del archivo filepath que ya está  definido como cadenas de strings con el parámetro “utf-8”, esto provoca que el formato del contenido del archivo se muestre en consola con una estructura extraña. 
- Explicación detallada de la corrección: Borrar el método stringify


Error # 6: Implementación de código de estado incorrecta 
- Ubicación: 28
- Tipo de error: Lógico 
- Explicación detallada del error: El código de estado implementado para indicar que no se encontró un recurso no es correcto, se usó el código 200, pero este significa que la operación se realizó correctamente.
- Explicación detallada de la corrección: Se cambió el código 200 por el código 404 que signifca "recurso no encontrado".










