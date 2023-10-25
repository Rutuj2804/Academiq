import { AttachmentRounded } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../../../utils/hooks";

interface CProps {
    name: string;
    description: string;
    attachments: number;
    id: string;
}

const ActivityCard = ({ name, description, attachments, id }: CProps) => {

    const navigate = useNavigate()

    const { encrypt } = useCrypto()

    return (
        <div className="activityCard__Wrapper" onClick={()=>navigate(`/activity/${encrypt(id!)!}`)}>
            <h6>{name}</h6>
            <p>{description}</p>
            <span><AttachmentRounded /> {attachments} files attached</span>
        </div>
    );
};

export default ActivityCard;
