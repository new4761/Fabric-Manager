
 ::minifabwin netup 
 ::minifabwin create -c testchannel
 ::minifabwin join
 ::minifabwin anchorupdate
 ::minifabwinfab profilegen
call minifabwin install -n simple -l go -v 1.0 -r true
call minifabwin approve 
call minifabwin commit
call minifabwin initialize  -p \"wtf\",\"a\",\"5\",\"b\",\"2\"
call minifabwin discover
call minifabwin query -p \"query\",\"a\"
::minifabwin explorerup

pause