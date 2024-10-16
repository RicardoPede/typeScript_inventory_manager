# Implementación de Patrones:

En el desarrollo de software, los patrones de diseño son soluciones probadas a problemas comunes que los desarrolladores enfrentan. 

# 1- Patrón Singleton

Uno de estos patrones es el Singleton, que asegura que una clase tenga solo una instancia y proporciona un punto de acceso global a esa instancia. 

### Descripción del Patrón Singleton
El patrón Singleton se utiliza para restringir la creación de instancias de una clase a una sola instancia. 
Esto es útil cuando se necesita exactamente un objeto para coordinar acciones en todo el sistema. 

### Implementación en la Aplicación
En esta aplicación, he aplicado el patrón Singleton a la clase DB en el archivo db.ts. 

## Justificación de la Elección del Patrón Singleton

Control de Conexión Única: En una aplicación que maneja múltiples solicitudes concurrentes, es crucial que solo haya una conexión a la base de datos para evitar problemas de consistencia y sobrecarga. 
El patrón Singleton asegura que solo haya una instancia de la conexión a la base de datos.

## Ventajas del Cambio
Consistencia: Asegura que todas las partes de la aplicación utilicen la misma conexión a la base de datos, lo que mejora la consistencia de los datos.

Simplicidad: Simplifica el código al proporcionar un punto de acceso único a la conexión de la base de datos.

Escalabilidad: Facilita la escalabilidad de la aplicación al gestionar eficientemente la conexión a la base de datos.

# 2- Patron Factory

El patrón Factory se utiliza para crear objetos sin especificar la clase exacta del objeto que se creará. En esta aplicación, el patrón Factory puede ser útil para crear diferentes tipos de usuarios (por ejemplo, administrador, técnico, etc.) sin acoplar el código a las clases concretas.

### Justificación de la Elección del Patrón Factory

Desacoplamiento: El patrón Factory desacopla la creación de objetos de su uso, permitiendo que el código sea más flexible y fácil de mantener.

Extensibilidad: Es fácil añadir nuevos tipos de usuarios sin modificar el código existente. Solo necesitas añadir una nueva clase que implemente la interfaz User y actualizar la fábrica.

Centralización: Centraliza la lógica de creación de objetos en un solo lugar, lo que facilita la gestión y el mantenimiento del código.

### Ventajas del Cambio

Flexibilidad: Permite crear instancias de diferentes tipos de usuarios de manera dinámica y flexible.

Mantenibilidad: Facilita el mantenimiento del código al centralizar la lógica de creación de objetos.

Escalabilidad: Hace que el código sea más escalable al permitir la adición de nuevos tipos de usuarios sin cambios significativos en el código existente.

El patron Factory se encuentra implementado en el archivo userFactory.ts.
Esta función es importada en el servicio de creación de usuarios, user.service.ts, para crear instancias de diferentes tipos de usuarios.

# 3- Patrón Observer
El patrón Observer se ha implementado para gestionar la actualización del inventario en tiempo real. Este patrón permite que un objeto (sujeto) notifique a otros objetos (observadores) sobre cualquier cambio en su estado, sin necesidad de que los objetos estén fuertemente acoplados.

## Justificación de la Elección del Patrón Observer
Desacoplamiento: El patrón Observer desacopla el sujeto de sus observadores, permitiendo que ambos evolucionen de manera independiente.

Reactividad: Permite que el sistema reaccione automáticamente a los cambios en el inventario, actualizando a todos los observadores registrados.

Extensibilidad: Es fácil añadir nuevos observadores sin modificar el código del sujeto. Solo necesitas implementar la interfaz Observer y registrar el nuevo observador.

## Ventajas del Cambio
Flexibilidad: Permite añadir o quitar observadores en tiempo de ejecución sin afectar al sujeto.

Mantenibilidad: Facilita el mantenimiento del código al separar la lógica de actualización del inventario de la lógica de notificación.

Escalabilidad: Hace que el código sea más escalable al permitir la adición de nuevos observadores sin cambios significativos en el código existente.

## Implementación del Patrón Observer
El patrón Observer se encuentra implementado en los archivos Inventory.ts y InventoryObserver.ts.

### Inventory.ts
Este archivo define la clase Inventory, que actúa como el sujeto. La clase Inventory mantiene una lista de observadores y notifica a todos los observadores registrados cuando hay un cambio en el inventario.

### InventoryObserver.ts
Este archivo define la clase InventoryObserver, que implementa la interfaz Observer. La clase InventoryObserver se registra como observador del Inventory y define el método update para manejar las notificaciones.

## Registro del Observador
En el archivo principal de configuración de la aplicación, se instancia Inventory y InventoryObserver, y se añade el observador a la lista de observadores del Inventory.

## Notificación de Cambios
Cuando se realiza una actualización en el inventario, Inventory notifica a todos los observadores registrados llamando al método update en cada observador.