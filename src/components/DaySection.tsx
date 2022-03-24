import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid';
import styles from '../styles/Home.module.css'
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_MEDICINE_STATUSES, INSERT_MEDICINE_STATUS, UPDATE_MEDICINE_STATUS } from '../apollo';

interface Props {
    timeOfDay: string;
    className: string;
}

enum MedicineStatus {
    NO_DATA = "NoData",
    MISSED = "Missed",
    LATE = "Late",
    SUCCESS = "Success"
}

export default function DaySection({ timeOfDay, className }: Props) {
    const [getMedicineStatuses, { loading, error, data, refetch }] = useLazyQuery(GET_MEDICINE_STATUSES);
    const [insertMedicineStatus, { data: insertData, loading: loadingInsert, error: insertError }] = useMutation(INSERT_MEDICINE_STATUS);
    const [updateMedicineStatus, { data: updateData, loading: loadingUpdate, error: updateError }] = useMutation(UPDATE_MEDICINE_STATUS);

    useEffect(() => {
        refetch();
    }, [])

    const statuses: string[] = [MedicineStatus.MISSED, MedicineStatus.LATE, MedicineStatus.SUCCESS, MedicineStatus.NO_DATA];

    const circleStatusLoggedAlready = (identifier: string) => {
        const [loggedTimeOfDay, loggedPillNumber] = identifier.split("-");
        return data && data.Medicine.filter((med: any) => med.timeOfDay === loggedTimeOfDay && med.pillNumber === parseInt(loggedPillNumber));
    }

    const handleClick = (e: any) => {
        const identifier = e.target.getAttribute('data-circleid');
        let newStatusIndex = 0;
        const loggedAlready = circleStatusLoggedAlready(identifier);
        if (loggedAlready.length) {
            const value = loggedAlready[loggedAlready.length - 1]
            const newIndex = statuses.indexOf(value.takenStatus) + 1;
            newStatusIndex = newIndex > statuses.length - 1 ? 0 : newIndex;

            updateMedicineStatus({
                variables: {
                    id: value.id,
                    takenStatus: statuses[newStatusIndex],
                }
            });
        } else {
            insertMedicineStatus({
                variables: {
                    timeOfDay: timeOfDay,
                    takenStatus: statuses[newStatusIndex],
                    medicineName: "Levothyroxine",
                    pillNumber: identifier.split("-")[1]
                }
            });
        }

        refetch();
    }

    const configureAdditionalStyle = (identifier: string) => {
        const loggedAlready = circleStatusLoggedAlready(identifier);
        if (loggedAlready && loggedAlready.length) {
            switch (loggedAlready[loggedAlready.length - 1].takenStatus) {
                case MedicineStatus.LATE:
                    return styles.medicineCircleLate;
                case MedicineStatus.SUCCESS:
                    return styles.medicineCircleSuccess;
                case MedicineStatus.MISSED:
                    return styles.medicineCircleMissed;
                default:
                    return styles.medicineCircleNoData;
            }
        } else {
            return styles.medicineCircleNoData;
        }
    }

    return (
        <>
            <Grid item xs={4} style={{ display: "inline-flex" }}>
                <span className="material-icons">
                    {className}
                </span>
                <p style={{ padding: 0, marginLeft: 8, marginTop: 0, marginBottom: 0, marginRight: 0 }}>{timeOfDay}</p>
            </Grid>
            <Grid item xs={6} style={{ display: "inline-flex" }}>
                {[...Array(10)].map((_: any, circleIndex: number) => (
                    <div onClick={handleClick} key={circleIndex} data-circleid={`${timeOfDay}-${circleIndex}`} className={`${styles.medicineCircle} ${configureAdditionalStyle(`${timeOfDay}-${circleIndex}`)}`} />
                ))}
            </Grid>
        </>

    )
}