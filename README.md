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

Heroku не принял такой вариант и пришлось руками всё копировать, естественно 
это нужно закомитить.

Дальше по тексту: https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku