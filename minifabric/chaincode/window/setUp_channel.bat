call minifabwin netup 
::call minifabwin netup -y  OR("org0-example-com.peer","org1-example-com.peer")
call minifabwin create -c testchannel
call minifabwin join
call minifabwin anchorupdate
call minifabwin explorerup
::minifabwinfab profilegen
::pause