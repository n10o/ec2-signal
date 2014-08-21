#! /bin/sh
# EC2 instance start/stop CUI tool (Use ec2-signal API)
########################################################
# Usage example
# $ ./control.sh {start|stop} idlist
# $ cat idlist
# > i-1234567
# > i-2345678

URL="http://localhost:3000/instance/"

case "$1" in
    start)
        CMD="start/"
        ;;
    stop)
        CMD="stop/"
        ;;
    *)
        echo $"Usage: control.sh {start|stop} <Instance-Id-List-File>"
        exit 1
        ;;
esac

if [ "$2" = "" ]; then
    echo "Require input file"
    exit 1
fi

while read line
do
    curl $URL$CMD$line
done < $2
