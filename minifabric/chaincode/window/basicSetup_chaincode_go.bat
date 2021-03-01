 ::minifabwin netup 
 ::minifabwin create -c testchannel
 ::minifabwin join
 ::minifabwin anchorupdate
 ::minifabwinfab profilegen
call minifabwin install -n simple -r false -l go -v 2.0
call minifabwin approve 
call minifabwin commit
call minifabwin initialize  -p \"wtf\",\"a\",\"5\",\"b\",\"2\"
::call minifabwin discover
::call minifabwin query -p \"query\",\"a\"
::minifabwin explorerup
pause