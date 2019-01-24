function FindProxyForURL(url, host) 
{  
return "PROXY 127.0.0.1:808";
if (isInNet(myIpAddress(), "192.168.1.0", "255.255.255.0"))
return "PROXY 192.168.1.1:8080";
else
return "DIRECT";
}
