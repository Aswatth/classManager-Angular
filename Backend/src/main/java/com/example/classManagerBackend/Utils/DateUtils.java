package com.example.classManagerBackend.Utils;

import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Service
public class DateUtils
{

    public Date GetCurrentDate()
    {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
        LocalDate currentDate = LocalDate.now();

        String feesDate = currentDate.format(dateFormatter) + "-01";

        Date dateToSave = new Date();
        try
        {
            dateToSave = new SimpleDateFormat("yyyy-MM-dd").parse(feesDate);
        }
        catch (ParseException e)
        {
            e.printStackTrace();
        }
        return dateToSave;
    }

    public Date IncrementDate(Date date)
    {
        SimpleDateFormat dateTimeFormatter = new SimpleDateFormat("yyyy-MM-dd");
        String currentDate =  dateTimeFormatter.format(date);
        LocalDate nextDate = LocalDate.parse(currentDate);
        nextDate = nextDate.plusMonths(1);

        Date d = new Date();

        try
        {
            d = new SimpleDateFormat("yyyy-MM-dd").parse(nextDate.toString());
        }
        catch (ParseException e)
        {

        }
        return d;
    }
}
