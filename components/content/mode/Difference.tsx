import { cn } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { IoMdCheckmarkCircle, IoMdClose } from 'react-icons/io';
import { tableData } from '@/data';

const Difference = () => {
    return (
        <div className={cn("max-w-2xl mx-auto")}>
            <Table className='text-left lg:text-base'>
                <TableHeader>
                <TableRow className='border-b-white'>
                    <TableHead className='text-white font-bold'>Caractéristiques</TableHead>
                    <TableHead className='text-primary font-bold'>Pack Pro</TableHead>
                    <TableHead className='text-white font-bold'>Autres</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow key={index} className='border-b-white/20'>
                            <TableCell className='font-medium text-white'>{row.feature}</TableCell>
                            <TableCell>
                                {row.pro ? (
                                    <IoMdCheckmarkCircle className="text-primary text-2xl" />
                                ) : (
                                    <IoMdClose className="text-primary text-2xl" />
                                )}
                            </TableCell>
                            <TableCell>
                            {row.others ? (
                                <IoMdCheckmarkCircle className="text-white text-2xl" />
                                ) : (
                                <IoMdClose className="text-white text-2xl" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Difference;