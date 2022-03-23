для запуска фронта с бэком, нужно перенести скомпилированные файлы
папки build (для её создания npm run build) в resources/static

можно использовать скрипт мавена для перемещения содержимого папки build
(этот текст отображается нормально только в окне редактирования, хз чё с ним делать, смотри там)

<plugin>
<artifactId>maven-resources-plugin</artifactId>
<executions>
<execution>
<id>copy-resources</id>
<phase>validate</phase>
<goals>
<goal>copy-resources</goal>
</goals>
<configuration>
<outputDirectory>${basedir}/target/classes/static/</outputDirectory>
<resources>
<resource>
<directory>${basedir}/src/main/client/build</directory>
</resource>
</resources>
</configuration>
</execution>
</executions>
</plugin>

шоп завелось mvn clean и install (compile например не сработает). 
UPDATE!!! почемуто пропустило кусок кода, на 3000 порту в сурсах хрома одно,
а на 8080 другое - отсутствует пара строк кода. Ну вот как так.

Heroku не принял такой вариант и пришлось руками всё копировать, естественно 
это нужно закомитить.

Дальше по тексту: https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku