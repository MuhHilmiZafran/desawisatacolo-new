<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateFacility extends Migration
{
    public function up()
    {
        //
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 20,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => '255',
            ],
        ]);

        $this->forge->addKey('id', true);

        $this->forge->createTable('facilities');
    }

    public function down()
    {
        //
    }
}
